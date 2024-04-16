"use client";
import { Textarea } from "@/components/ui/textarea";
import { StoryReturnTypes } from "@/utils/actions/insertStory";
import { submitPrompt } from "@/utils/actions/submitPrompt";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const createSchema = z.object({
    prompt: z
        .string()
        .min(15, "Minimum characters should be 15!")
        .max(60, "Maximum characters should be 60!"),
});

export default function CreatePrompt() {
    const [pending, setPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [scenario, setScenario] = useState<StoryReturnTypes | null>(null);
    const router = useRouter();
    let attempts = 0;
    let submitErr = "";

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            prompt: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createSchema>) {
        setPending(true);
        setErrorMessage("");

        if (attempts >= 3) {
            setErrorMessage(`Could not create story: ${submitErr}`);
            setPending(false);
            return;
        }

        try {
            const scenarioData = await submitPrompt(values);
            setPending(false);
            setIsDisabled(true);
            setIsFormOpen(false);
            setScenario(scenarioData);
            // router.push(`/story/${storyId}`)
        } catch (err) {
            attempts++;
            submitErr = String(err);
            onSubmit(values);
        }
    }

    return (
        <>
            {isFormOpen && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full p-4 sm:py-4 md:p-0 space-y-6 text-center"
                    >
                        <h1 className="text-4xl font-bold">Create a story.</h1>
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <p className="mb-5">
                                        Write your own story and make different
                                        choices to affect the outcome.
                                    </p>
                                    <FormControl>
                                        <Textarea
                                            className="font-mono mx-auto text-center resize-none w-auto sm:w-[35rem]"
                                            minLength={15}
                                            maxLength={60}
                                            placeholder="What is your story about?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <Button
                            variant={"outline"}
                            className="w-fit mx-auto"
                            type="submit"
                            disabled={isDisabled}
                        >
                            <div className="flex items-center justify-center gap-2">
                                {pending ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <Bot />
                                )}
                                Create your story
                            </div>
                        </Button>
                        {errorMessage && (
                            <p style={{ color: "rgba(255,50,105,0.600)" }}>
                                {errorMessage}
                            </p>
                        )}
                    </form>
                </Form>
            )}
            {scenario && (
                <section className="mt-10 p-4 flex flex-col flex-wrap justify-center items-start gap-4">
                    <h4 className="text-[1.15rem]">
                        <b>Prompt:</b> {scenario.prompt}
                    </h4>
                    <article className="max-w-[800px] flex flex-col gap-2">
                        <h4 className="font-semibold text-[1.05rem]">
                            Your story:
                        </h4>
                        <TextGenerateEffect
                            className="font-normal text-[1.05rem]"
                            words={
                                scenario.story ? scenario.story : "Loading..."
                            }
                        />
                    </article>
                    <Button
                        onClick={() => {
                            if (!scenario.prompt) return;
                            return submitPrompt({ prompt: scenario.prompt });
                        }}
                        className="font-semibold flex justify-center items-center gap-2"
                    >
                        <Bot /> Regenerate
                    </Button>
                    <div className="flex flex-col flex-wrap gap-2">
                        <h4 className="font-semibold">Make your choice:</h4>
                        {scenario.choices.map((choice, index) => {
                            return (
                                <div
                                    key={index}
                                    className="py-2 px-4 cursor-pointer bg-neutral-800 hover:bg-neutral-900 w-fit rounded-md"
                                >
                                    {choice}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </>
    );
}
