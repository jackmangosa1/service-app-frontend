"use client";
import React, { useState } from "react";
import { Input, Button, Upload, message, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import apiRoutes from "../../../../../config/apiRoutes";

const { Option } = Select;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryName: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([
    "barber",
    "cleaning",
    "electrician",
    "car repair",
    "moving",
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    if (!categories.includes(value)) {
      setCategories((prev) => [...prev, value]);
    }
    setForm((prev) => ({
      ...prev,
      categoryName: value,
    }));
  };

  const [imageFileName, setImageFileName] = useState<string | null>(null);

  const handleImageUpload = (info: any) => {
    const file = info.file;
    setImageFileName(file.name);

    if (file.originFileObj) {
      setImageFile(file.originFileObj);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const userId =
        localStorage.getItem("userId") || sessionStorage.getItem("userId");
      if (!userId) {
        message.error("User not authenticated.");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.title);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("categoryName", form.categoryName);
      formData.append("priceType", "1");
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await fetch(apiRoutes.createService, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        message.success("Service created successfully!");
      } else {
        const error = await response.json();
        message.error(error.message || "Failed to create service.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      message.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload Image</div>
    </div>
  );

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-gray-50 flex-1 ml-16 md:ml-96">
      <h1 className="text-2xl font-bold mb-6">Create New Service</h1>

      <div className="space-y-6">
        <div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageUpload}
          >
            {imageFileName ? (
              <div className="text-center">
                <p>{imageFileName}</p>
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter service title"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select or type category"
            value={form.categoryName}
            onChange={handleCategoryChange}
            filterOption={(input, option) => {
              const optionChildren =
                (option?.children as unknown as string) || "";
              return optionChildren.toLowerCase().includes(input.toLowerCase());
            }}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <Input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            type="number"
            prefix="$"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your service"
            rows={4}
            className="w-full"
          />
        </div>

        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Create Service
        </Button>
      </div>
    </div>
  );
};

export default Page;
