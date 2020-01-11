const router = require('express').Router()
const Order = require('../models/order')
const Shipment = require('../models/shipment')

const _ = require('lodash')

//TODO: Optimize the switch statement

// @type    POST/order-notifications
// @desc    To handle any new notifications
// @access  Public
router.route('/').post(async(req, res) => {
    switch(req.body.eventType) {
        case 'shipment_created':
            // TODO: Req and obj validation

            // Deep cloning using lodash
            const newShipment = new Shipment({
                shipmentId: req.body.shipmentId,
                orderItems: _.cloneDeep(req.body.attributes.orderItems),
                locationId: req.body.locationId,
                dispatchByDate: req.body.attributes.dispatchByDate,
                forms: _.cloneDeep(req.body.attributes.forms),
                subShipments: _.cloneDeep(req.body.attributes.subShipments),
                timestamp: req.body.timestamp,
                updatedAt: req.body.attributes.updatedAt,
                hold: req.body.attributes.hold
            })

            newShipment.save()
                .then(shipment => {
                    return res.json({message: 'Success', shipment})
                })
                .catch(e => {
                    return res.status(500).json({message: 'Failure', reason: 'Server-side error.'})
                })

            // TODO: Handle inner fields like orderItems and forms as well
            // TODO: Create a notification doc/obj 

            break

        case 'shipment_packed':
                // TODO: Req validation

                let filter1 = { shipmentId: req.body.shipmentId }
                let update1 = { status: req.body.attributes.status }

                let shipment1 = await Shipment.findOneAndUpdate(filter1, update1, {new: true})

                if(shipment1) {
                    return res.json({message: 'Success', shipment1})
                } else {
                    return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
                }

                // TODO: Create notification

                break
        
        case 'shipment_ready_to_dispatch':
                // TODO: Req validation

                let filter2 = { shipmentId: req.body.shipmentId }
                let update2 = { status: req.body.attributes.status }

                let shipment2 = await Shipment.findOneAndUpdate(filter2, update2, {new: true})

                if(shipment2) {
                    return res.json({message: 'Success', shipment2})
                } else {
                    return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
                }

                // TODO: Create notification

                break
        
        case 'shipment_pickup_complete':
                // TODO: Req validation

                let filter3 = { shipmentId: req.body.shipmentId }
                let update3 = { status: req.body.attributes.status }

                let shipment3 = await Shipment.findOneAndUpdate(filter3, update3, {new: true})

                if(shipment3) {
                    return res.json({message: 'Success', shipment3})
                } else {
                    return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
                }

                // TODO: Create notification

                break

        case 'shipment_shipped':
                // TODO: Req validation

                let filter4 = { shipmentId: req.body.shipmentId }
                let update4 = { status: req.body.attributes.status }

                let shipment4 = await Shipment.findOneAndUpdate(filter4, update4, {new: true})

                if(shipment4) {
                    return res.json({message: 'Success', shipment4})
                } else {
                    return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
                }

                // TODO: Create notification

                break

        case 'shipment_delivered':
                // TODO: Req validation

                let filter5 = { shipmentId: req.body.shipmentId }
                let update5 = { status: req.body.attributes.status }

                let shipment5 = await Shipment.findOneAndUpdate(filter5, update5, {new: true})

                if(shipment5) {
                    return res.json({message: 'Success', shipment5})
                } else {
                    return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
                }

                // TODO: Create notification

                break

        case 'shipment_dispatch_dates_changed':
            //TODO: Req validation

            let filter6 = { shipmentId: req.body.shipmentId }
            let update6 = { dispatchByDate: req.body.attributes.dispatchByDate }

            let shipment6 = await Shipment.findOneAndUpdate(filter6, update6, {new: true})

            if(shipment6) {
                return res.json({message: 'Success', shipment6})
            } else {
                return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'})
            }

            break

        // TODO: Complete the rest of the endpoints
           
        case 'shipment_cancelled':

             let filter7 = { shipmentId: req.body.shipmentId }
             let update7 = { status: req.body.attributes.status }

             let shipment7 = await Shipment.findOneAndUpdate(filter7, update7, {new: true})

             if(shipment7) {
                return res.json({message: 'Success', shipment7})
             } else {
                return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
             }

             // TODO: Create notification

             break
         
        case 'shipment_form_failed':

             let filter8 = { shipmentId: req.body.shipmentId }
             let update8 = { status: req.body.attributes.status }

             let shipment8 = await Shipment.findOneAndUpdate(filter8, update8, {new: true})

             if(shipment8) {
                return res.json({message: 'Success', shipment8})
             } else {
                return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
             }

             // TODO: Create notification

             break
        
        case 'return_created':
             let filter9 = { shipmentId: req.body.shipmentId }
             let update9 = { status: req.body.attributes.status }

             let shipment9 = await Shipment.findOneAndUpdate(filter9, update9, {new: true})

             if(shipment9) {
                return res.json({message: 'Success', shipment9})
             } else {
                return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
             }

             // TODO: Create notification
             break;
 
        case 'return_completed':
             
             let filter10 = { shipmentId: req.body.shipmentId }
             let update10 = { status: req.body.attributes.status }

             let shipment10 = await Shipment.findOneAndUpdate(filter10, update10, {new: true})

             if(shipment10) {
                return res.json({message: 'Success', shipment10})
             } else {
                return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
             }

             // TODO: Create notification
             break;
             
        case 'return_cancelled':
             let filter11 = { shipmentId: req.body.shipmentId }
             let update11 = { status: req.body.attributes.status }

             let shipment11 = await Shipment.findOneAndUpdate(filter11, update11, {new: true})

             if(shipment11) {
                return res.json({message: 'Success', shipment11})
             } else {
                return res.status(511).json({message: 'Failure', reason: 'Shipment not found.'}) 
             }

             // TODO: Create notification
             break;
             
        default:
            return res.status(400).json({status: 'Failure', reason: 'Bad request'})
    }
})

module.exports = router
