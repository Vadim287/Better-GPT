import AssistantCard from './assistant-card'

interface AssistantListProps {
  assistants: OpenAiAssistant[]
}

const AssistantList = ({ assistants }: AssistantListProps) => {
  return assistants.map((assistant) => (
    <AssistantCard key={assistant.id} assistant={assistant} />
  ))
}

export default AssistantList
