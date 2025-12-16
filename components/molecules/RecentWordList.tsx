'use client'

import RecentWord from '../atoms/RecentWord'

export default function RecentWordList({}) {
    return (
        <section className="flex flex-col gap-5">
            <RecentWord word={"ephemeral"} date={"Today"} correct={true}/>
            <RecentWord word={"aboveboard"} date={"Today"} correct={true}/>
        </section>
    )
}