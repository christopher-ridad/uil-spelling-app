import { COLORS } from '../../lib/colors'
import { MisspellCardFront } from '../../components'

export default function SpellingPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-teal-300">
            <MisspellCardFront
                color={COLORS.green.bg}
                colorDark={COLORS.green.bgDark}
                colorHover={COLORS.green.bgHover}
                colorFocus={COLORS.green.bgFocus}
                headerText="Word Lists"
                score_correct={12}
                score_total={15}
            />
        </main>
    )
}