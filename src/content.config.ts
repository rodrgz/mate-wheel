import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import type { ZodType, infer as ZodInfer } from 'astro/zod';

const reference = defineCollection({
  loader: glob({
    base: './src/content/reference',
    pattern: '**/*.md'
  }),
  schema: z.object({
    title: z.string().optional()
  })
});

const baseDescriptorSchema = z.object({
  id: z.string(),
  label: z.string(),
  polarity: z.enum(['positive', 'contextual', 'defect']),
  styles: z.array(z.string()),
  intensityRange: z.tuple([z.number(), z.number()]).optional(),
  tooltip: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type Descriptor = ZodInfer<typeof baseDescriptorSchema> & {
  children?: Descriptor[];
};

const descriptorSchema: ZodType<Descriptor> = baseDescriptorSchema.extend({
  children: z.lazy(() => z.array(descriptorSchema).optional()),
});

const wheel = defineCollection({
  loader: glob({
    base: './src/content/wheel',
    pattern: '**/*.{yaml,yml,json}'
  }),
  schema: z.object({
    meta: z.object({
      version: z.number()
    }),
    styles: z.array(z.object({
      id: z.string(),
      label: z.string(),
      shortLabel: z.string().optional(),
      description: z.string()
    })),
    families: z.array(z.object({
      id: z.string(),
      label: z.string(),
      color: z.string(),
      descriptors: z.array(descriptorSchema)
    }))
  })
});

export const collections = {
  reference,
  wheel
};
