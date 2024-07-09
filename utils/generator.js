const generatePin = () => {
    function randomD() {
        return Math.floor(Math.random() * 10);
    }

    var fullRand = "", iNewRand, iRand;

    for (var i = 0; i < 4; i++) {
        iNewRand = randomD();
        if (i > 0) {
            if (Math.abs(iNewRand - iRand) <= 1) {
                iRand = (iNewRand + 3) % 10;
            }
            else {
                iRand = iNewRand;
            }
        }
        else {
            iRand = iNewRand;
        }
        fullRand += iRand;
    }
    //console.log(fullRand);

    return fullRand;
};

module.exports = generatePin;
