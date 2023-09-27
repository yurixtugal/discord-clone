"use client"

import { useEffect, useState } from "react"
import CreateServerModal from "@/components/modals/create-server-modal"
import InviteModal from "@/components/modals/invite-modal"
import EditServerModal from "@/components/modals/edit-server-modal "
import MembersModal from "../modals/members-modal"
import CreateChannelModal from "../modals/create-channel-modal"
import LeaveModal from "../modals/leave-modal"
import DeleteModal from "../modals/delete-server"
import DeleteChannelModal from "../modals/delete-channel"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if (!isMounted) return null

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveModal />
            <DeleteModal />
            <DeleteChannelModal />
        </>
    )
}