import { COLORS } from '../../lib/colors'
import { FlippableSpellingCard } from '../../components'

export default function SpellingPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-600 to-orange-300">
            <FlippableSpellingCard
                color={COLORS.yellow.bg}
                colorDark={COLORS.yellow.bgDark}
                colorHover={COLORS.yellow.bgHover}
                colorFocus={COLORS.yellow.bgFocus}
                colorText={COLORS.yellow.bgText}
                colorBorder={COLORS.yellow.bgBorder}
                colorBorder2={COLORS.yellow.bgBorder2}
                colorLight={COLORS.yellow.bgLight}
                headerText="Mock Test"
                score_correct={12}
                score_total={15}
                word={"zoot suit"}
                definition={"a flamboyant men's suit from the 1930s-40s with oversized jackets, wide padded shoulders, and high-waisted, baggy trousers that taper to tight cuffs"}
                example={"He is wearing a nice zoot suit."}
                partOfSpeech={"noun"}
            />
        </main>
    )
}