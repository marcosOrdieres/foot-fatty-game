export const indexAndGames = (index: number, games: number) => {
    if (games < 6) {
        if (index === games - 1) {
            return true
        } else {
            return false
        }
    } else if (games < 11) {
        if (index === games - 6) {
            return true
        } else {
            return false
        }
    } else if (games < 16) {
        if (index === games - 11) {
            return true
        } else {
            return false
        }
    } else if (games < 21) {
        if (index === games - 16) {
            return true
        } else {
            return false
        }
    } else if (games < 26) {
        if (index === games - 21) {
            return true
        } else {
            return false
        }
    } else if (games < 31) {
        if (index === games - 26) {
            return true
        } else {
            return false
        }
    } else if (games < 36) {
        if (index === games - 31) {
            return true
        } else {
            return false
        }
    }
}