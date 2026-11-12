import { FAQ_COPY } from './faqCopy'
import type { FaqAccordionItem } from '../components/FaqAccordion'

export const FAQ_ITEMS: FaqAccordionItem[] = FAQ_COPY.map((item) => ({
  id: item.id,
  title: item.title,
  content: <div dangerouslySetInnerHTML={{ __html: item.html }} />,
}))
