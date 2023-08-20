'use client'

import {
  FolderPlus,
  MessageSquarePlus,
  PanelLeftOpen,
  PanelRightOpen,
} from 'lucide-react'
import ChatFolders from './chat-folders'
import { Button } from '../ui/button'
import { useState } from 'react'
import NewChatDialog from './new-chat-dialog'
import NewFolderDialog from './new-folder-dialog'
import { Chat, Folder } from '@prisma/client'

interface ChatSidebarProps {
  folders: ({
    chats: ({
      _count: {
        messages: number
      }
    } & Chat)[]
    _count: {
      chats: number
    }
  } & Folder)[]
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ folders }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='flex flex-col gap-4 h-full bg-secondary py-6'>
      <div className='flex gap-2 items-center px-4'>
        <Button variant='ghost' size='icon' onClick={handleOpen}>
          {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
        </Button>
        {isOpen && <h1 className='text-2xl font-bold'>Chats</h1>}
      </div>
      {isOpen && (
        <>
          <div className='flex gap-3 min-w-max px-4'>
            <NewChatDialog folders={folders}>
              <Button>
                <MessageSquarePlus size={24} className='mr-2' />
                New Chat
              </Button>
            </NewChatDialog>
            <NewFolderDialog>
              <Button variant='outline'>
                <FolderPlus size={24} />
              </Button>
            </NewFolderDialog>
          </div>

          <div className='bg-background'>
            <ChatFolders folders={folders} />
          </div>
        </>
      )}
    </div>
  )
}

export default ChatSidebar
