import Layout from "@/components/layouts";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import FormAddProduct from "@/components/elements/FormAddProduct";
import { toast } from "@/components/ui/use-toast";
import FormEditProduct from "@/components/elements/FormEditProducts";

const getDatafromLS = () => {
  const data = localStorage.getItem("myDatabase");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const HomePage = () => {
  const [products, setProducts] = useState(getDatafromLS);
  const [isLoading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const product = await setProducts(getDatafromLS);
      setProducts(product);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const deleteProduct = (value: string) => {
    console.log("hapus");
    setLoading(true);
    const filtered = products.filter((item: any) => {
      return item.id !== value;
    });
    setProducts(filtered);
    setLoading(false);
  };

  const filterName = (value: string) => {
    setLoading(true);
    if (value) {
      const filtered = products.filter((item: any) => {
        const brandLowerCase = item.merek.toLowerCase();
        return brandLowerCase.includes(value);
      });
      setProducts(filtered);
    } else {
      setProducts(getDatafromLS);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem("myDatabase", JSON.stringify(products));
  }, [products, isLoading]);

  return (
    <Layout>
      <div className="w-full h-full bg-white/90 rounded-md p-10">
        <div className="w-full flex items-center justify-between mb-8">
          <input
            type="search"
            aria-label="Search Products"
            placeholder="Search by name product"
            onChange={(e) => filterName(e.target.value)}
            className="w-full md:w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
              </DialogHeader>
              <FormAddProduct refetchProduct={() => getDatafromLS()} />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableCaption>A list of prodocts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">id</TableHead>
              <TableHead>Merek</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead className="w-[50px]">Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead className="w-[120px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-center">
                  {item.id}
                </TableCell>
                <TableCell>{item.merek}</TableCell>
                <TableCell>{item.jenis}</TableCell>
                <TableCell className="text-center">{item.stock}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.decs}</TableCell>
                <TableCell className="flex justify-center">
                  <div className="flex items-center gap-x-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Pencil />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit product</DialogTitle>
                        </DialogHeader>
                        <FormEditProduct
                          refetchProduct={() => getDatafromLS()}
                          id={item.id}
                        />
                      </DialogContent>
                    </Dialog>

                    <Trash onClick={() => deleteProduct(item.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default HomePage;
