"use client"

import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/lib/generated/prisma/client";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }: SettingsFormProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const origin = useOrigin();
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data:SettingsFormValues)=>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${initialData.id}`, data);
            toast.success("Store updated successfully");
            router.refresh();
        } catch(error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    const handleDelete = async ()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${initialData.id}`);
            toast.success("Store deleted successfully");
            router.refresh();
            router.push("/");
        } catch(error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => handleDelete()} loading={loading} />
    <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store settings" />
        <Button variant="destructive" size="icon" disabled={loading} className="cursor-pointer" onClick={() => setOpen(true)}>
            <TrashIcon className="w-4 h-4" />
        </Button>
    </div>
    <Separator />
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="grid grid-cols-3 gap-8">
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} disabled={loading} placeholder="Store name" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Button type="submit" className="ml-auto" disabled={loading}>Save changes</Button>
        </form>
    </Form>
    <Separator />
    <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${initialData.id}`} variant="public" />
    </>
  )
}

export default SettingsForm