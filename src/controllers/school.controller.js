import { School } from "../models/school.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { calculateDistance } from "../utils/calculateDistance.js";

export const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      !latitude ||
      !longitude ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return next(
        new ApiError("All fields are required and must be valid", 400)
      );
    }

    const school = await School.create({ name, address, latitude, longitude });
    return res
      .status(201)
      .json(new ApiResponse(true, "School created successfully"));
  } catch (error) {
    next(error);
  }
};

export const listsSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    if (
      !latitude ||
      !longitude ||
      isNaN(parseFloat(latitude)) ||
      isNaN(parseFloat(longitude))
    ) {
      return next(
        new ApiError(
          "latitude and longitude is required and most be valid number",
          400
        )
      );
    }
    const schools = await School.find();
    const sortedSchools = schools
      .map((school) => ({
        ...school.toObject(),
        distance: calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res
      .status(200)
      .json(
        new ApiResponse(true, "School fetched successfully", sortedSchools)
      );
  } catch (error) {
    next(error);
  }
};
