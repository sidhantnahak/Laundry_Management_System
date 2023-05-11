const Laundry = require('../Models/LaundryModel')
const User = require('../Models/Usermodel')

exports.getAllLaundryRequest = async (req, res) => {
    try {
        const requests = await Laundry.find({ user: req.id });

        if (requests) {
            return res.status(200).json({ requests, sucess: true })

        }
    } catch (error) {
        return res.status(400).json({ message: error.message, sucess: false });

    }

}

exports.createLaundryRequest = async (req, res) => {
    const { top_wear, bottom_wear, cloth_type, service_type, contact, description, required_date, request_date } = req.body;
    if (top_wear == "" || bottom_wear == "" || cloth_type == "" || service_type == "" || contact == "") {
        return res.status(404).json({ message: "enter valid details", sucess: false })
    }
    if (!top_wear || !bottom_wear || !cloth_type || !service_type || !contact) {
        return res.status(404).json({ message: "enter valid details", sucess: false })
    }


    try {

        const request = await Laundry.create({
            user: req.id,
            top_wear,
            bottom_wear,
            cloth_type,
            service_type,
            contact,
            description,
            required_date,
            request_date


        });
        const user = await User.findById(req.id)
        const notification = { message:`Your request has been confirmed on ID : ${request._id}`,date:request.request_date }
        user.notification.push(notification);

        await user.save({ validateBeforeSave: false })

        const requests = await Laundry.find({ user: req.id });




        return res.status(200).json({ requests, sucess: true })
    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })
    }
}

exports.deleterequest = async (req, res) => {

    const request = await Laundry.findById(req.params.id);
    if (!request) {
        return res.status(404).json({ message: "note not found", sucess: false })
    } else if (request.user.toString() != req.id) {
        return res.status(401).json({ message: "not allowed", sucess: false })

    }

    try {
        await Laundry.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Deleted sucessfully", sucess: true })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })

    }

}

exports.updaterequest = async (req, res) => {

    try {
        if (!req.params.id) {
            return res.status(404).json({ message: "note not found", sucess: false })

        }
        const request = await Laundry.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "note not found", sucess: false })
        }
        else if (request.user.toString() != req.id) {
            return res.status(401).json({ message: "not allowed", sucess: false })

        }



        const { top_wear, bottom_wear, cloth_type, service_type, contact, description, required_date, request_date, status } = req.body;


        if (top_wear == "" || bottom_wear == "" || cloth_type == "" || service_type == "" || contact == "") {
            return res.status(404).json({ message: "enter valid details", sucess: false })
        }

        if (!top_wear || !bottom_wear || !cloth_type || !service_type || !contact) {
            return res.status(404).json({ message: "enter valid details", sucess: false })
        }
        await Laundry.findByIdAndUpdate(req.params.id, { top_wear, bottom_wear, cloth_type, service_type, contact, description, required_date, request_date, status });
        return res.status(200).json({ message: "updated sucessfully", sucess: true })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })
    }
}


//Admin user

exports.getalllaudries = async (req, res) => {
    try {
        const requests = await Laundry.find();

        if (requests) {
            return res.status(200).json({ requests, sucess: true })

        }
    } catch (error) {
        return res.status(400).json({ message: error.message, sucess: false });

    }

}



//Update order status - Admin
exports.Updatlaundry = async (req, res, next) => {
    const laundry = await Laundry.findById(req.params.id)
    if (!laundry) {
        return res.status(404).json({ message: "request not found", sucess: false })

    }
    if (req.body.status === "Finished" && laundry.status === "Finished") {
        return res.status(404).json({ message: "laundry status already has been finished", sucess: false })

    }

    if (req.body.status === "Accepted") {
        laundry.status = "Accepted"
    } else if (req.body.status === "Inprogress")
        laundry.status = "Inprogress"

    else if (req.body.status === "Finished") {
        laundry.status = "Finished"

    }
    await laundry.save({
        validateBeforeSave: false
    })

    res.status(200).json({
        sucess: true,
        laundry
    })
}


//delete a order -- admin
exports.deletelaundry = async (req, res) => {

    try {
        const laundry = await Laundry.findById(req.params.id)
        if (!laundry) {
            return res.status(404).json({ message: "request not found", sucess: false })
        }

        await Laundry.findOneAndDelete(req.params.id)

        res.status(200).json({
            sucess: true,
            message: `Order on ${req.params.id} id deleted sucessfully `
        })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })

    }

}