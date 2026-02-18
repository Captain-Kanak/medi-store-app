"use client";

import { useState, useRef } from "react";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Edit3,
  Loader2,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateUserProfile } from "@/actions/user.action";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileDisplay({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  console.log(user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      let finalImageUrl = user?.image || "";

      if (imageFile) {
        const uploadedUrl = await uploadImageToImgBB(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const { data, error } = await updateUserProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        image: finalImageUrl,
      });

      if (data?.success) {
        toast.success("Profile updated successfully!", { id: toastId });
        setIsOpen(false);
        setImageFile(null);
        router.refresh();
      } else {
        throw new Error(error?.message || "Failed to update profile");
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="relative overflow-hidden rounded-3xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600" />

        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex items-end justify-between mb-6">
            <div className="h-32 w-32 rounded-3xl border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-100 shadow-xl">
              {user?.image ? (
                <Image
                  src={user.image}
                  height={100}
                  width={100}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400">
                  <User size={48} />
                </div>
              )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold gap-2 shadow-lg shadow-blue-500/20 cursor-pointer">
                  <Edit3 size={16} /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-none dark:bg-slate-900 shadow-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Update Profile
                  </DialogTitle>
                  <DialogDescription>
                    Change your personal details and profile picture.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                  {/* Image Upload Section */}
                  <div className="flex flex-col items-center gap-3 py-2">
                    <div
                      className="relative h-24 w-24 rounded-2xl overflow-hidden group cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <Camera size={24} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={20} className="text-white" />
                      </div>
                    </div>
                    <Label
                      className="text-[10px] font-bold uppercase text-blue-600 cursor-pointer hover:underline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Click to change photo
                    </Label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Full Name
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="rounded-xl bg-slate-100 dark:bg-slate-800 border-none h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Phone Number
                      </Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="rounded-xl bg-slate-100 dark:bg-slate-800 border-none h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Address
                      </Label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="rounded-xl bg-slate-100 dark:bg-slate-800 border-none min-h-20"
                      />
                    </div>
                  </div>

                  <Button
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-blue-600 font-bold mt-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-1 mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {user?.name}
            </h2>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Mail size={16} /> {user?.email}
              <span className="h-1 w-1 rounded-full bg-slate-300 mx-1" />
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none rounded-lg text-[10px] font-bold uppercase tracking-wider">
                {user?.role}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={<Phone className="text-blue-500" />}
              label="Phone"
              value={user?.phone || "Not set"}
            />
            <InfoCard
              icon={<MapPin className="text-rose-500" />}
              label="Address"
              value={user?.address || "Not set"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-800 flex items-start gap-4 transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
      <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

function Badge({ children, className }: any) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
