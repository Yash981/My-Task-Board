"use client"
import { OpenSidebarSheet } from '@/components/open-sidebar-sheet'
import React, { useEffect, useState } from 'react'

type Props = {}

const SheetProvider = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    return (
        <>
            <OpenSidebarSheet />
        </>
    )
}

export default SheetProvider