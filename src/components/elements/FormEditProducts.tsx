"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  id: z.string(),
  merek: z.string().min(2).max(50),
  jenis: z.string().min(2).max(50),
  stock: z.string(),
  price: z.string(),
  decs: z.string().min(2).max(50),
});

const getDatafromLS = () => {
  const data = localStorage.getItem("myDatabase");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

interface Props {
  refetchProduct: () => void;
  id: any;
}

const FormEditProduct = ({ refetchProduct, id }: Props) => {
  const [products, setProducts] = useState(getDatafromLS);

  useEffect(() => {
    const filtered = products?.filter((item: any) => {
      return item.id === id;
    });
    setProducts(filtered);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: products.id ?? "",
      merek: products.merek ?? "",
      jenis: products.jenis ?? "",
      stock: products.stock ?? "",
      price: products.price ?? "",
      decs: products.decs ?? "",
    },
    values: {
      id: products.id ?? "",
      merek: products.merek ?? "",
      jenis: products.jenis ?? "",
      stock: products.stock ?? "",
      price: products.price ?? "",
      decs: products.decs ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setProducts([...products, values]);
    refetchProduct();
  }

  useEffect(() => {
    localStorage.setItem("myDatabase", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="id product" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="merek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Merek</FormLabel>
              <FormControl>
                <Input placeholder="Merek Product" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jenis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis</FormLabel>
              <FormControl>
                <Input placeholder="Jenis" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="stock yang tersedia"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Harga product" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="decs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Input placeholder="Keterangan" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormEditProduct;
