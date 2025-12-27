import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import Navbar from "@/components/Navbar";

interface FormError {
  name?: string;
  phone?: string;
  address?: string;
  products?: string;
}

const CreateOrder: React.FC = () => {
  const [form, setForm] = useState({
    products: [] as string[],
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState<FormError>({});

  // input / textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name as keyof FormError]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // checkbox
  const handleCheckboxChange = (name: string, value: string[]) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors.products) {
      setErrors({ ...errors, products: undefined });
    }
  };

  const validate = () => {
    const newErrors: FormError = {};

    if (form.products.length === 0) {
      newErrors.products = "Chọn ít nhất 1 món";
    }

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập tên";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{9,11}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!form.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log("SUBMIT:", form);
    alert("Tạo đơn hàng thành công 🎉");

    setForm({
      products: [],
      name: "",
      phone: "",
      address: "",
      note: "",
    });
  };

  return (
    <div className="mx-auto mt-3 max-w-4xl">
      <Navbar username={"Nguyễn Văn A"} title={"Tạo đơn hàng"} />
      <div className="flex flex-col gap-4">
        <CheckboxGroup
          label="Món ăn"
          name="products"
          value={form.products}
          onChange={handleCheckboxChange}
          error={errors.products}
          options={[
            { label: "Trà sữa trân châu", value: "trasua" },
            { label: "Bánh mì thịt", value: "banhmi" },
            { label: "Gà rán", value: "garan" },
            { label: "Khoai tây chiên", value: "khoaitay" },
          ]}
        />

        <Textarea
          label="Mô tả"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Nhập mô tả "
        />

        <Input
          label="Tên"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Họ và tên"
        />

        <Input
          label="Số điện thoại"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Nhập 1 số điện thoại hợp lệ"
        />

        <Input
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
          error={errors.address}
          placeholder="Nhập 1 địa chỉ hợp lệ"
        />

        <Button className="w-fit" onClick={handleSubmit}>
          Tạo đơn mới
        </Button>
      </div>
    </div>
  );
};

export default CreateOrder;
