"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await console.log(values);
    }
    return(
        <Modal title="Create store" description="Add a new store" isOpen={storeModal.isOpen} onclose={storeModal.onClose}>
            <div className="space-y-4 py-2 pb-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Store name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                            <Button type="submit">Create Store</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
};