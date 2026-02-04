import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddMedicineForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Medicine Form</CardTitle>
        <CardDescription>You can add Medicine Here</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="add-medicine-form"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel>Medicine Name</FieldLabel>
              <Input
                type="text"
                name="name"
                placeholder="Enter Medicine Name"
              />
            </Field>
            <Field>
              <FieldLabel>Medicine Name</FieldLabel>
              <Textarea name="name" placeholder="Enter Medicine Name" />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="add-medicine-form"
          type="submit"
          className="cursor-pointer"
        >
          Add Medicine
        </Button>
      </CardFooter>
    </Card>
  );
}
