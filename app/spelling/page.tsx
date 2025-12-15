import { COLORS } from '../../lib/colors'
import { FlippableSpellingCard } from '../../components'

export default function SpellingPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500">
            <FlippableSpellingCard
                color={COLORS.blue.bg}
                colorDark={COLORS.blue.bgDark}
                colorHover={COLORS.blue.bgHover}
                colorFocus={COLORS.blue.bgFocus}
                colorText={COLORS.blue.bgText}
                colorBorder={COLORS.blue.bgBorder}
                colorBorder2={COLORS.blue.bgBorder2}
                colorLight={COLORS.blue.bgLight}
                headerText="Spelling Practice"
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