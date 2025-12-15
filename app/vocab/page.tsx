import { COLORS } from '../../lib/colors'
import { FlippableSpellingCard } from '../../components'

export default function SpellingPage() {
    return (
            <FlippableSpellingCard
                color={COLORS.red.bg}
                colorDark={COLORS.red.bgDark}
                colorHover={COLORS.red.bgHover}
                colorFocus={COLORS.red.bgFocus}
                colorText={COLORS.red.bgText}
                colorBorder={COLORS.red.bgBorder}
                colorBorder2={COLORS.red.bgBorder2}
                colorLight={COLORS.red.bgLight}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
                word={"zoot suit"}
                definition={"a flamboyant men's suit from the 1930s-40s with oversized jackets, wide padded shoulders, and high-waisted, baggy trousers that taper to tight cuffs"}
                example={"He is wearing a nice zoot suit."}
                partOfSpeech={"noun"}
            />
        )
}