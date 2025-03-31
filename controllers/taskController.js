import Task from "../models/Task.js";
import { putObject, getObject } from "../services/s3Service.js";

// Create a new task
export const createTask = async (req, res) => {
  const { name, description, diffusion, deadline, community } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "Image is required" });

  const bucketName = process.env.BUCKET_NAME;
  await putObject(bucketName, file);

  const task = await Task.create({
    name,
    description,
    diffusion,
    deadline,
    community,
    created_by: req.user.id,
    image: file.originalname,
  });

  const imageUrl = await getObject(bucketName, file.originalname);
  task.image = imageUrl;

  res.status(201).json(task);
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  const tasks = await Task.find(req.query);

  const bucketName = process.env.BUCKET_NAME;
  for (const task of tasks) {
    task.image = await getObject(bucketName, task.image);
  }

  res.json(tasks);
};

// Get task details by ID
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  const bucketName = process.env.BUCKET_NAME;
  task.image = await getObject(bucketName, task.image);

  res.json(task);
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
};
