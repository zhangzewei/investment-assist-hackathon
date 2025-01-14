import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function InvestTest({ onSubmit }: { onSubmit?: (values: object) => void }) {
  const tests = [{
    title: 'When your investment experiences a loss, your reaction is:',
    answers: [
      'Panic and sell immediately',
      'Feel uneasy but consider long-term investment',
      'Feel excited and think it’s a buying opportunity'
    ]
  }, {
    title: 'Your primary investment goal is:',
    answers: [
      'Capital preservation',
      'Stable growth',
      'High risk for high returns'
    ]
  }, {
    title: 'Your level of understanding of investments:',
    answers: [
      'Almost no knowledge',
      'Some knowledge, able to understand basic concepts',
      'Extensive knowledge, capable of in-depth analysis'
    ]
  }, {
    title: 'When making investment decisions, you:',
    answers: [
      'Rely on others’ advice',
      'Refer to some materials but ultimately rely on your judgment',
      'Conduct in-depth research before making a decision'
    ]
  }, {
    title: 'You prefer to:',
    answers: [
      'Invest short-term for quick returns',
      'Invest medium to long-term for stable growth',
      'Invest long-term and wait for larger returns'
    ]
  }, {
    title: 'When the market is volatile, your emotional response is:',
    answers: [
      'Feel anxious and frequently check the market',
      'Remain relatively calm and observe market trends',
      'Think volatility is normal and won’t affect my decisions'
    ]
  }, {
    title: 'How much risk asset (like stocks) do you want in your investment portfolio?',
    answers: [
      'Very little, mainly bonds and fixed income',
      'Some, to maintain diversity',
      'Mostly, to pursue high returns'
    ]
  }];
  const formSchema = z.object({
    [tests[0].title]: z.enum([tests[0].answers[0], ...tests[0].answers.slice(1)] as [string, ...string[]]),
    [tests[1].title]: z.enum([tests[1].answers[0], ...tests[1].answers.slice(1)] as [string, ...string[]]),
    [tests[2].title]: z.enum([tests[2].answers[0], ...tests[2].answers.slice(1)] as [string, ...string[]]),
    [tests[3].title]: z.enum([tests[3].answers[0], ...tests[3].answers.slice(1)] as [string, ...string[]]),
    [tests[4].title]: z.enum([tests[4].answers[0], ...tests[4].answers.slice(1)] as [string, ...string[]]),
    [tests[5].title]: z.enum([tests[5].answers[0], ...tests[5].answers.slice(1)] as [string, ...string[]]),
    [tests[6].title]: z.enum([tests[6].answers[0], ...tests[6].answers.slice(1)] as [string, ...string[]]),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  function handleSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmit) {
      onSubmit(values);
    }
  }
  return <Card>
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <CardHeader>
        <CardTitle>Choose Your Invest Like</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <Form {...form}>
          {
            tests.map((test) => (
              <FormField
                key={test.title}
                control={form.control}
                name={test.title}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{test.title}</FormLabel>
                    <FormControl>
                      <RadioGroup {...field}>
                        {
                          test.answers.map((answer) => (
                            <div key={`option-${answer}`} className="flex items-center space-x-2">
                              <RadioGroupItem value={answer} id={`option-${answer}`} />
                              <Label htmlFor={`option-${answer}`}>{answer}</Label>
                            </div>
                          ))
                        }
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))
          }
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={!form.formState.isValid}>Confirm</Button>
      </CardFooter>
    </form>
  </Card>
}