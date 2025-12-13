'use client'

import FeatureButton from '../atoms/FeatureButton'

// re-examine html tags + arial labels

export default function FeatureButtonGrid() {
    return (
        <main className="button-container">
            <FeatureButton
                color="red"
                buttonText="Feature"
            />
                
            <FeatureButton
                color="blue"
                buttonText="Feature"
            />

            <FeatureButton
                color="green"
                buttonText="Feature"
            />

            <FeatureButton
                color="yellow"
                buttonText="Feature"
            />
            <FeatureButton
                color="pink"
                buttonText="Feature"
            />
            
            <FeatureButton
                color="orange"
                buttonText="Feature"
            />
        </main>      
    )
}