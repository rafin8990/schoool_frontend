import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Target, Lightbulb, Users } from "lucide-react"

export default function MissionAndVision() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">আমাদের লক্ষ্য ও উদ্দেশ্য</h1>

      <Tabs defaultValue="mission" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-green-100">
          <TabsTrigger value="mission">লক্ষ্য</TabsTrigger>
          <TabsTrigger value="vision">উদ্দেশ্য</TabsTrigger>
        </TabsList>
        <TabsContent value="mission">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-6 w-6" />
                আমাদের লক্ষ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                আমাদের লক্ষ্য হল উচ্চমানের শিক্ষা প্রদানের মাধ্যমে ছাত্রদের সর্বাঙ্গীণ বিকাশ সাধন করা এবং তাদেরকে একবিংশ শতাব্দীর চ্যালেঞ্জ
                মোকাবেলায় প্রস্তুত করা।
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>উন্নত মানের শিক্ষা প্রদান</li>
                <li>নৈতিক মূল্যবোধ গড়ে তোলা</li>
                <li>সামাজিক দায়িত্ববোধ সৃষ্টি করা</li>
                <li>বৈশ্বিক নাগরিক হিসেবে গড়ে তোলা</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vision">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-6 w-6" />
                আমাদের উদ্দেশ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                আমাদের উদ্দেশ্য হল একটি জ্ঞান-ভিত্তিক, নৈতিক এবং প্রগতিশীল সমাজ গড়ে তোলা, যেখানে প্রতিটি শিক্ষার্থী তার সম্পূর্ণ সম্ভাবনা
                অর্জন করতে পারে।
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VisionCard
                  icon={<Lightbulb className="h-6 w-6" />}
                  title="উদ্ভাবনী চিন্তাধারা"
                  description="শিক্ষার্থীদের মধ্যে উদ্ভাবনী চিন্তাধারা ও সৃজনশীলতা উৎসাহিত করা"
                />
                <VisionCard
                  icon={<Users className="h-6 w-6" />}
                  title="সহযোগিতা"
                  description="টিমওয়ার্ক ও সহযোগিতার মাধ্যমে সামাজিক দক্ষতা বৃদ্ধি করা"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function VisionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="flex items-start p-4">
        <div className="mr-4 mt-1 text-primary">{icon}</div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

