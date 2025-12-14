import { COLORS } from '../../lib/colors'
import { WordCardFront } from '../../components'

export default function SpellingPage() {
    return (
        <WordCardFront
            color={COLORS.green.bg}
            colorDark={COLORS.green.bgDark}
            colorHover={COLORS.green.bgHover}
            colorFocus={COLORS.green.bgFocus}
            headerText="UIL Spelling Practice"
            score_correct={12}
            score_total={15}
        />
    )
}