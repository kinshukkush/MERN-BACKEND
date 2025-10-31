import orderModel from "../models/orderModel.js";

const newOrder = async (req, res) => {
  try {
    const body = req.body;
    const result = await orderModel.create(body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderModel.find({ email: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showAllOrders = async (req, res) => {
  try {
    const { status = "", page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const count = await orderModel.countDocuments({ status: { $regex: status } });
    const total = Math.ceil(count / limit);
    const result = await orderModel
      .find({ status: { $regex: status } })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ orders: result, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    console.log('📝 Update order request:', { id, status, method: req.method, path: req.path });
    
    const result = await orderModel.updateOne(
      { _id: id },
      { $set: { status } }
    );
    console.log('Update result:', result);
    
    res.status(200).json(result);
  } catch (err) {
    console.error('Update order error:', err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('🗑️ Delete order request:', { id, method: req.method, path: req.path });
    
    const result = await orderModel.deleteOne({ _id: id });
    console.log('Delete result:', result);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully", result });
  } catch (err) {
    console.error('Delete order error:', err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export { newOrder, showOrders, showAllOrders, updateOrder, deleteOrder };
