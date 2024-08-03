import Notification from "../models/notification.model.js"


export const getNotifications=async(req,res)=>{
    try{
    const notifications= await Notification.find({to: req.user._id})
    .populate({
        path: "from",
        select: "username profileImg"
    }).select("-to");
    await Notification.updateMany({to: req.user._id},{read: true});
    res.status(200).json(notifications);
   }
   catch(error){
    console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
   }
}

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteNotification=async(req,res)=>{
    try {
        const {id}=req.params;
        const notification=await Notification.findById(id);
        if(!notification) return res.status(404).json({error: "Notification not found"});
        if(notification.to.toString()!==req.user._id.toString()) {
            return res.status(403).json({error: "You are not authorised to delete this notification"});
        }
        await Notification.findByIdAndDelete(id);
        res.status(200).json({message: "Notification deleted successfully"});
        
    } catch (error) {
        console.log("Error in deleteNotification function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}