const router = require('express').Router()

const Listing = require('../models/listing')

const validateListing = require('../utility/validate').validateListing
const validateUpdateReq = require('../utility/validate').validateUpdateReqBody
const validatePriceUpdateReq = require('../utility/validate').validatePriceUpdateReq

const updateValidReqFields = ['mrp', 'selling_price', 'stock_count', 'local_shipping_charge', 'zonal_shipping_charge', 'national_shipping_charge', 'listing_status', 'procurement_sla', 'procurement_type', 'actual_stock_count']
const priceUpdateValidFields = ['skuId', 'mrp', 'selling_price']

// @type    POST/listings
// @desc    To post new listing
// @access  Public
router.route('/').post(async(req, res) => {
    //console.log(req)

    const newListing = new Listing({
        ...req.body
    })

    // console.log(newListing)

    // TODO: Validation

    const validatedObject = await validateListing(newListing)

    if(validatedObject.status === 'Failure') {
        return res.status(400).json({status: 'Failure', reason: validatedObject.reason})
    }

    console.log('exec')
    newListing.save()
        .then(listing => res.json({listing}))
        .catch(e => res.status(400).json({msg: 'Error.', code: e.code, error: e.errMsg}))
})

// @type    POST/listings/update/price
// @desc    Update product listing's price.
// @access  Public
router.route('/update/price').post(async(req, res) => {
    const validatedReqObj = await validatePriceUpdateReq(req, priceUpdateValidFields)

    console.log(req.body)
    console.log(validatedReqObj)

    if(validatedReqObj.status === 'Failure') {
        return res.status(400).json({status: validatedReqObj.status, reason: validatedReqObj.reason})
    }

    let skuId = req.body.skuId

    let filter = { skuId }

    let update = { ...req.body }

    let listing = await Listing.findOneAndUpdate(filter, update, {
        new: true
    })

    if(!listing) {
        return res.status(400).json({status: 'Failure', reason: 'Invalid skuId'})
    } else {
        const validatedObject = await validateListing(listing)

        if(validatedObject.status === 'Failure') {
            return res.status(400).json({status: 'Failure', reason: validatedObject.reason})
        }


        listing.save()
            .then(listing => {
                return res.json({status: 'Success', ...listing})
            })
            .catch(e => {
                return res.status(500).json({status: 'Failure', reason: 'Server-side error.'})
            })
    }
})

// @type    POST/listings/update/:sku
// @desc    To update a listing using skuID
// @access  Public
router.route('/update/:sku').post(async(req, res) => {
    //TODO: Validate req params
    skuId = req.params.sku

    let filter = {skuId}
        
    //TODO: Validate req body
    const validatedReq = await validateUpdateReq(req, updateValidReqFields)
    
    if(validatedReq.status === 'Failure') {
        return res.status(400).json({status: validatedReq.status, reason: validatedReq.reason})
    }

    let update = { ...req.body }

    let listing = await Listing.findOneAndUpdate(filter, update, {
        new: true
    })

    if(!listing) {
        return res.status(400).json({status: 'Failure', reason: 'Invalid skuId'})
    } else {
        const validatedObject = await validateListing(listing)

        if(validatedObject.status === 'Failure') {
            return res.status(400).json({status: 'Failure', reason: validatedObject.reason})
        }


        listing.save()
            .then(listing => {
                return res.json({status: 'Success', ...listing})
            })
            .catch(e => {
                return res.status(500).json({status: 'Failure', reason: 'Server-side error.'})
            })
    }
})

// @type    GET/listings/{:sku}
// @desc    Retrieve the information listed against the provided SKU Id
// @access  Public
router.route('/:sku').get(async(req, res) => {
    const skuId = req.params.sku

    let filter = { skuId }

    let listing = await Listing.findOne(filter)

    if(!listing) {
        return res.status(400).json({status: 'Failure', reason: 'Invalid SKU ID'})
    } else {
        return res.json({status: 'Success', listing})
    }
})

module.exports = router