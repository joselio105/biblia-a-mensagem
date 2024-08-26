import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";

export function ReportDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-red-500 hover:text-red-500 sm:w-fit"
        >
          <TriangleAlert className="mr-2 h-5 w-5" />
          Informar Problema
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-auto scroll-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informar Problema</DialogTitle>
          <DialogDescription>
            Sua contribuição é essencial para que possamos oferecer uma
            experiência de leitura mais precisa e agradável. Utilize o
            formulário abaixo para reportar erros ou sugerir melhorias.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
