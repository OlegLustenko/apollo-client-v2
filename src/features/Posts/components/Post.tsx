'use client';

import React, {
  ComponentProps,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useMutation, useSuspenseQuery } from '@apollo/client';
import {
  GET_POST_QUERY,
  UPDATE_POST_MUTATION,
} from 'api/querries/posts.querries';
import { StarIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from 'components/ui/button';
import { Textarea } from 'components/ui/textarea';
import { cn } from 'lib/utils';
import { PostValidation } from 'features/Posts/@core/post.validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form';
import { LoadingSpinner } from 'components/ui/spinner';
import { useOnBeforeUnloadEffect } from 'hooks/useOnBeforeUnloadEffect';
import { useToast } from 'components/ui/use-toast';
import { ToastAction } from 'components/ui/toast';
import { Checkbox } from 'components/ui/checkbox';
import { useDebouncedCallback } from 'use-debounce';

const formResolver = zodResolver(PostValidation);

type CreateOnCancel = (
  setMode: (mode: FormMode) => void,
  valueName: 'title' | 'body',
) => ComponentProps<typeof Button>['onClick'];

export const Post = ({ params }: { params: { postId: string } }) => {
  const {
    data: { post },
    client,
  } = useSuspenseQuery(GET_POST_QUERY, { variables: { id: params.postId } });

  const setPersistentValues = (data: PostValidation) => {
    client.writeQuery({
      query: GET_POST_QUERY,
      variables: { id: params.postId },
      data: {
        post: {
          ...post,
          title: data.title,
          body: data.body,
        },
      },
    });
  };

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          "There was a problem with your request. The data wasn't saved",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
    onCompleted: () => {
      toast({
        title: 'Post updated successfully',
      });
    },
  });
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const [bodyMode, setBodyMode] = useState<FormMode>(FORM_MODE.read);
  const [titleMode, setTitleMode] = useState<FormMode>(FORM_MODE.read);
  const [autoSaveMode, setAutoSaveMode] = useState(false);
  const isBodyEditMode = isEditMode(bodyMode);
  const isBodyReadMode = isReadMode(bodyMode);

  const isTitleEditMode = isEditMode(titleMode);
  const isTitleReadMode = isReadMode(titleMode);

  useOnBeforeUnloadEffect(isBodyEditMode || isTitleEditMode);

  const form = useForm({
    resolver: formResolver,
    defaultValues: {
      title: post?.title ? post.title : '',
      body: post?.body ? post.body : '',
    },
  });
  const formValues = form.getValues();

  const onSubmit = (data: PostValidation) => {
    startTransition(async () => {
      await updatePost({
        variables: {
          input: { body: data.body, title: data.title },
          id: post?.id as string,
        },
      });
      setTitleMode('read');
      setBodyMode('read');
      setPersistentValues(data);
    });
  };

  const onChange = (data: PostValidation) => {
    startTransition(async () => {
      await updatePost({
        variables: {
          input: { body: data.body, title: data.title },
          id: post?.id as string,
        },
      });
    });
    setPersistentValues(data);
  };

  const onChangeDebounce = useDebouncedCallback(
    (event) => {
      if (!autoSaveMode) {
        return;
      }
      form.handleSubmit(onChange)(event);
    },
    500,
    {
      maxWait: 2000,
    },
  );

  useEffect(() => {
    // When the component goes to be unmounted, we will submit data if the input has changed.
    return () => onChangeDebounce.flush();
  }, [onChangeDebounce]);

  const createOnCancel: CreateOnCancel = (setMode, valueName) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMode('read');
    form.setValue(valueName, form.getValues()[valueName]);
  };

  const onTitleCancel = createOnCancel(setTitleMode, 'title');
  const onBodyCancel = createOnCancel(setBodyMode, 'body');

  return (
    <div className="m-auto flex w-full flex-col justify-center">
      <div className="flex justify-between">
        <h1 className="text-5xl">Post preview</h1>
        <AutosaveCheckbox
          value={autoSaveMode}
          onChange={setAutoSaveMode}
        />
      </div>
      <Form {...form}>
        <form
          className="m-auto flex w-full flex-col justify-center"
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={onChangeDebounce}
        >
          <div className="flex flex-col gap-4 pt-6">
            <div className="flex justify-between">
              {isTitleReadMode && (
                <h2 className="flex font-serif text-3xl italic underline underline-offset-8">
                  <StarIcon
                    className="items-baseline text-amber-500"
                    height={50}
                    width={50}
                  />
                  {formValues.title}
                  <span className="pl-0.5 text-gray-600"> #{post?.id}</span>
                </h2>
              )}
              {isTitleEditMode && (
                <div className="flex w-full">
                  <StarIcon
                    className="items-baseline text-amber-500"
                    height={50}
                    width={50}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full pr-2">
                        <FormControl>
                          <Input
                            className="flex w-full font-serif text-lg italic underline underline-offset-8"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-md" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div className="flex gap-2">
                {isTitleReadMode && (
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setTitleMode('edit');
                    }}
                    type="button"
                    className="min-w-24"
                  >
                    Edit
                  </Button>
                )}
                {isTitleEditMode && !autoSaveMode && (
                  <Button
                    type="submit"
                    className="min-w-24"
                  >
                    Save
                  </Button>
                )}
                <Button
                  onClick={onTitleCancel}
                  variant="secondary"
                  className={cn('min-w-24', {
                    'invisible': !isTitleEditMode,
                    'block': isTitleEditMode,
                  })}
                >
                  {autoSaveMode ? 'Preview' : 'Cancel'}
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              Author: XYZ
              <Pencil1Icon
                width={25}
                height={25}
                className="hover:text-blue-800"
                onClick={() => {
                  const newMode = isBodyReadMode ? 'edit' : 'read';
                  setBodyMode(newMode);
                }}
              />
            </div>

            {isBodyReadMode && (
              <p
                className={cn(
                  'whitespace-pre-line rounded-md border-y-2 p-2 text-2xl',
                  { 'animate-pulse text-orange-600': isBodyEditMode },
                )}
              >
                {formValues.body}
              </p>
            )}
            {isBodyEditMode && (
              <>
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem className="w-full pr-2">
                      <FormControl>
                        <Textarea
                          placeholder="modify post content here"
                          className="min-h-44 border border-b-8 border-blue-400 text-2xl"
                          {...field}
                          onBlur={() => {
                            field.onBlur();
                            // or better we can use "useClickOutside"
                            setBodyMode('read');
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
                {!autoSaveMode && (
                  <div className="flex justify-end gap-4">
                    <Button
                      type="submit"
                      className="bg-blue-600"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={onBodyCancel}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          <LoadingSpinner className={cn({ hidden: !isPending })} />
        </form>
      </Form>
    </div>
  );
};

const AutosaveCheckbox = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="autoSave"
        checked={value}
        onCheckedChange={onChange}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="autoSave"
          className="cursor-pointer font-medium leading-none"
        >
          Autosave changes on the page
        </label>
      </div>
    </div>
  );
};

const FORM_MODE = {
  read: 'read',
  edit: 'edit',
} as const;

type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE];

const isReadMode = (mode: FormMode) => mode === FORM_MODE.read;
const isEditMode = (mode: FormMode) => mode === FORM_MODE.edit;
