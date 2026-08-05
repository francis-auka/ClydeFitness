import { BlogPost } from "@/lib/blog/types";
import { CheckCircle2, HelpCircle } from "lucide-react";

interface ArticleBodyProps {
  post: BlogPost;
}

export default function ArticleBody({ post }: ArticleBodyProps) {
  return (
    <div className="text-[#F5F5F5] space-y-8 font-dm-sans leading-relaxed text-[16px] sm:text-[17px]">
      {post.content.map((block, idx) => {
        switch (block.type) {
          case "heading2":
            return (
              <div key={idx} className="pt-4">
                <h2 className="font-bebas text-[36px] sm:text-[44px] text-white leading-none tracking-tight mb-2">
                  {block.text}
                </h2>
                <div className="w-10 h-0.5 bg-green mb-6" />
              </div>
            );
          case "heading3":
            return (
              <h3 key={idx} className="font-bebas text-[28px] sm:text-[32px] text-white leading-none tracking-tight pt-2 mb-3">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={idx} className="text-[#CCCCCC] leading-[1.8]">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 bg-[#111111] p-6 border border-[#2A2A2A]">
                {block.items?.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green shrink-0 mt-1" />
                    <span className="text-[15px] text-[#E0E0E0]">{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}

      {/* FAQ Section if present */}
      {post.faq && post.faq.length > 0 && (
        <div className="pt-8 border-t border-[#2A2A2A] mt-12">
          <div className="mb-8">
            <p className="eyebrow mb-2">GOT QUESTIONS?</p>
            <div className="w-12 h-0.5 bg-green mb-4" />
            <h2 className="font-bebas text-[36px] sm:text-[44px] text-white leading-none">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {post.faq.map((faqItem, faqIdx) => (
              <div
                key={faqIdx}
                className="bg-[#111111] border border-[#2A2A2A] p-6"
              >
                <h3 className="font-dm-sans font-bold text-[18px] text-white flex items-start gap-3 mb-2">
                  <HelpCircle size={20} className="text-green shrink-0 mt-0.5" />
                  {faqItem.question}
                </h3>
                <p className="text-[#AAAAAA] text-[15px] pl-8 leading-relaxed">
                  {faqItem.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
