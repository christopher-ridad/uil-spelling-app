import { COLORS } from '../../lib/colors'
import { WordCardFront } from '../../components'

export default function SpellingPage() {
    return (
        <WordCardFront
            color={COLORS.orange.bg}
            colorDark={COLORS.orange.bgDark}
            colorHover={COLORS.orange.bgHover}
            colorFocus={COLORS.orange.bgFocus}
            headerText="UIL Spelling Practice"
            score_correct={12}
            score_total={15}
        />
    )
}