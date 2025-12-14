'use client'

import { COLORS } from '../../lib/colors'
import FeatureButton from '../atoms/FeatureButton'

// re-examine html tags + arial labels

export default function FeatureButtonGrid() {
    return (
        <main className="button-container">
            <FeatureButton
                color={COLORS.blue.bg}
                hoverColor={COLORS.blue.bgHover}
                buttonText="Feature"
                href="/spelling"
            />
                
            <FeatureButton
                color={COLORS.red.bg}
                hoverColor={COLORS.red.bgHover}
                buttonText="Feature"
                href="/vocab"
            />

            <FeatureButton
                color={COLORS.green.bg}
                hoverColor={COLORS.green.bgHover}
                buttonText="Feature"
                href="/mock-spelling"
            />

            <FeatureButton
                color={COLORS.yellow.bg}
                hoverColor={COLORS.yellow.bgHover}
                buttonText="Feature"
                href="/mock-vocab"
            />
            <FeatureButton
                color={COLORS.pink.bg}
                hoverColor={COLORS.pink.bgHover}
                buttonText="Feature"
                href="/mispelled"
            />
            
            <FeatureButton
                color={COLORS.orange.bg}
                hoverColor={COLORS.orange.bgHover}
                buttonText="Feature"
                href="/mock-test"
            />
        </main>      
    )
}