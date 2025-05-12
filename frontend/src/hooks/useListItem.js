import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCategories } from "../context/CategoryContext";
import { createItem } from "../Fetchers/itemFetcher";
import axios from "axios";
import BASE_URL from "../constants/baseUrl";

export const useListItem = () => {
  const { isAuthenticated, user } = useAuth();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    priceUnit: "day",
    location: "",
    images: [],
    features: [""],
    rules: [""],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
  
    console.log("Selected files:", files);
  
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
  
        try {
          const response = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          console.log("Image uploaded successfully:", response.data);
  
          return {
            url: response.data.image, // Cloudinary URL
            name: file.name,
            size: file.size,
          };
        } catch (err) {
          console.error("Image upload failed:", err);
          return null;
        }
      })
    );
  
    console.log("Uploaded images:", uploadedImages);
  
    const successfulUploads = uploadedImages.filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...successfulUploads],
    }));
  };
  

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addRule = () => {
    setFormData((prev) => ({ ...prev, rules: [...prev.rules, ""] }));
  };

  const updateRule = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData((prev) => ({ ...prev, rules: newRules }));
  };

  const removeRule = (index) => {
    const newRules = [...formData.rules];
    newRules.splice(index, 1);
    setFormData((prev) => ({ ...prev, rules: newRules }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.title || !formData.description || !formData.category) {
        setError("Please fill out all required fields");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      if (!formData.price || !formData.location) {
        setError("Please fill out all required fields");
        return;
      }
      setError("");
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    const filteredFeatures = formData.features.filter(
      (feature) => feature.trim() !== ""
    );
    const filteredRules = formData.rules.filter((rule) => rule.trim() !== "");

    setIsSubmitting(true);

    try {
      const itemData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        priceUnit: formData.priceUnit || "day",
        location: formData.location,
        images: formData.images.map((img) => img.url),
        category: formData.category,
        features: filteredFeatures,
        rules: filteredRules,
        availability: "Now",
        rating: 0,
        reviews: 0,
      };

      await createItem(itemData);
      setStep(4);
    } catch (error) {
      setError("Failed to create item. Please try again.");
      console.error("Error creating item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlers = {
    updateField,
    handleImageUpload,
    removeImage,
    addFeature,
    updateFeature,
    removeFeature,
    addRule,
    updateRule,
    removeRule,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    setStep,
    setError,
  };

  return {
    isAuthenticated,
    step,
    error,
    formData,
    handlers,
    categories,
    isSubmitting,
    navigate,
  };
};
