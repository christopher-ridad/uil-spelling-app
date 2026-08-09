'use client'

import QuickAction from '../QuickAction'

export default function QuickActions ({}) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickAction 
                label="Continue Practice"
                helperText="Pick up where you left off"
            />
            <QuickAction 
                label="Daily Challenge"
                helperText="5 words remaining"
            />
            <QuickAction 
                label="Review Mistakes"
                helperText="8 words to review"
            />
        </section>
    )
}

