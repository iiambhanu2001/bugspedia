import Bug from "../Modals/bugsSchema.js"
import User from "../Modals/userschema.js";
import { nanoid } from "nanoid";


export const getbugs = async (req, res) => {
  try {
    const data = await Bug.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addbugs = async (req, res) => {
  try {
    const { title, description, priority, status, text } = req.body;
    const userid = req.user.id;
    const name = req.user.name;

    if (!title) {
      return res.json("Please enter all fields.");
    }

    const bug = await Bug.create({
      title,
      description,
      priority,
      status: status || "new",
      createdBy: userid,
      createdByname: name,
    });
    if (text && text.trim() !== "") {

      bug.solution = [
        {
          text: text || "",
          createdBy: userid,
          createdByname: name,
        },
      ];
    }

    res.json(bug);
  } catch (error) {
    res.status(501).json("something went wrong");
  }
};

export const editbugs = async (req, res) => {
  try {
    const editbug = await Bug.findOne({ _id: req.params.id });
    const userid = req.user.id;
    const name = req.user.name
    if (!editbug)
      return res.status(404).json({
        message: "not found",
      });

    if (req.body.solution?.text) {
      editbug.solution.push({
        text: req.body.solution.text,
        createdAt: Date.now(),
        createdBy: userid,
        createdByname: name
      });
    }
  
    if (editbug.createdBy === userid) {
      editbug.title = req.body.title ?? editbug.title;
      editbug.description = req.body.description ?? editbug.description;
      editbug.status = req.body.status ?? editbug.status;
      editbug.priority = req.body.priority ?? editbug.priority;
    }


    await editbug.save();
    res.status(200).json(editbug);
    return editbug;
  } catch (error) {
    res.status(404).json("no bug found");
  }
};

export const deletebugs = async (req, res) => {
  const user = await User.findById(req.user.id);

  try {
    const bug = await Bug.findById(req.params.id);

    if (bug.createdBy === req.user.id && user.role === "admin") {
      await Bug.findByIdAndDelete(req.params.id);
      return res.status(202).json("deleted");
    }

    return res.status(403).json("not deleted");
  } catch (error) {
    res.status(500).json("error deleting bug");
  }
};

export const deletesol = async (req, res) => {
  const bug = await Bug.findById(req.params.id)

  const solcreatedid = (bug.solution.find(item => item._id.toString() === req.params.solid)).createdBy

  try {
    if (solcreatedid == req.user.id) {
      const result = await Bug.updateOne(
        { _id: req.params.id },
        { $pull: { solution: { _id: req.params.solid } } }
      );
      if (!result) {
        return res.status(404).json({ message: "no permission to delete" });
      }
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Solution not found" });
      }
    }
    res.status(200).json({ message: "Solution deleted successfully" });
  }
  catch (err) {
    res.json("no sol found")
  }

}