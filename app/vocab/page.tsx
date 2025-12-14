import { COLORS } from '../../lib/colors'
import { WordCardFront } from '../../components'

export default function SpellingPage() {
    return (
        <WordCardFront
            color={COLORS.red.bg}
            colorDark={COLORS.red.bgDark}
            colorHover={COLORS.red.bgHover}
            colorFocus={COLORS.red.bgFocus}
            headerText="UIL Spelling Practice"
            score_correct={12}
            score_total={15}
        />
    )
}