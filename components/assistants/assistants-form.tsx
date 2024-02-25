'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import ImageUploader from '../image-uploader'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Assistant } from '@prisma/client'

interface AssistantsFormProps {
  action: 'create' | 'update'
  data: Assistant | null
}

const assistantsFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  instructions: z.string().min(200, {
    message: 'Instructions must be at least 200 characters long',
  }),
  imagePublicId: z.string().optional(),
})

export type AssistantsFormType = z.infer<typeof assistantsFormSchema>

const AssistantsForm = ({ action, data }: AssistantsFormProps) => {
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues =
    data && action === 'update'
      ? {
          name: data.name,
          description: data.description,
          instructions: data.instructions,
          imagePublicId: data.imagePublicId,
        }
      : {
          name: '',
          description: '',
          instructions: '',
          imagePublicId: '',
        }

  const form = useForm({
    resolver: zodResolver(assistantsFormSchema),
    defaultValues: initialValues,
  })

  const onSubmit = async (values: AssistantsFormType) => {
    console.log(values)
    // Call the API to create or update the assistant
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          name='imagePublicId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUploader
                  disabled={true}
                  onValueChange={field.onChange}
                  setImage={setImage}
                  publicId={field.value}
                  image={image}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Elon Musk' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    'This AI assistant is designed to mimic Elon Musk. It can answer questions, provide information, and engage in casual conversation.'
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='instructions'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Familiarize yourself with Elon Musk's mannerisms, speech patterns, and notable characteristics through interviews, speeches, and articles.Aim to replicate Musk's casual yet articulate communication style. Use a mix of technical jargon and layman's terms to convey complex ideas simply...`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant='default' className='mt-8' type='submit'>
          Create Assistant
        </Button>
      </form>
    </Form>
  )
}

export default AssistantsForm
