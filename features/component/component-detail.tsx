import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { ComponentWithRelations } from "@/types";
import Image from "next/image";
import { CodeViewer } from "./code-viewer";

export function ComponentDetail({
  component,
}: {
  component: ComponentWithRelations;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full bg-indigo-50 text-indigo-700">
            {component.category.name}
          </Badge>
          {component.tags.map(({ tag }) => (
            <Badge key={tag.id} variant="outline" className="rounded-full">
              {tag.name}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-slate-900">{component.title}</h1>
        {component.description && (
          <p className="text-lg text-slate-600">{component.description}</p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
        {component.previewImage ? (
          <div className="relative aspect-[16/9]">
            <Image
              src={component.previewImage}
              alt={component.title}
              fill
              className="object-contain p-4"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center text-slate-400">
            Preview tidak tersedia
          </div>
        )}
      </div>

      <Tabs defaultValue="html" className="space-y-4">
        <TabsList className="rounded-xl bg-slate-100">
          <TabsTrigger value="html" className="rounded-lg">
            HTML
          </TabsTrigger>
        </TabsList>
        <TabsContent value="html">
          <CodeViewer code={component.htmlCode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
