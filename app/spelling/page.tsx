import { COLORS } from '../../lib/colors'
import { WordCardFront } from '../../components'

export default function SpellingPage() {
    return (
        <WordCardFront
            color={COLORS.blue.bg}
            colorDark={COLORS.blue.bgDark}
            colorHover={COLORS.blue.bgHover}
            colorFocus={COLORS.blue.bgFocus}
            headerText="UIL Spelling Practice"
            score_correct={12}
            score_total={15}
        />
    )
}