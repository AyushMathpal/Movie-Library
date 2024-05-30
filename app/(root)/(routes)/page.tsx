import SearchInput from '@/components/SearchInput'
import React from 'react'
import DisplayList from '@/components/DisplayList'
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/prisma/prismadb';
import CreateList from './content/[movieId]/components/CreateList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Recommendations from '@/components/Recommendations';
const page = async() => {
  const user = await currentUser();
  const list = await prisma.watchList.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className="h-full p-4 space-y-2">
      <div className='flex gap-x-6'>
    <SearchInput/>
    <Popover>
      <PopoverTrigger asChild>
      <Button size="sm"><Plus className='w-4 mr-1'/>Create New Playlist </Button>
      </PopoverTrigger>
     <PopoverContent>
      <CreateList/>
     </PopoverContent>
    </Popover>
    
    </div >
    
    <DisplayList list={list}/>
  </div>
  )
}

export default page