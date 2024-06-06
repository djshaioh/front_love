

document.addEventListener("DOMContentLoaded", function () {

    function initGallery(gallerySelector, prevSelector, nextSelector, imageSelector) {
        let curPos = 0;
        let position = 0;
        const prevBtn = document.querySelector(prevSelector);
        const nextBtn = document.querySelector(nextSelector);
        const images = document.querySelector(imageSelector);
        const totalImages = images.querySelectorAll("img").length;

        function prev() {
            if (curPos > 0) {
                nextBtn.removeAttribute("disabled");
                position += images.clientWidth / totalImages;
                images.style.transform = `translateX(${position}px)`;
                curPos--;
            }
            if (curPos === 0) {
                prevBtn.setAttribute('disabled', 'true');
            }
        }

        function next() {
            if (curPos < totalImages - 1) {
                prevBtn.removeAttribute("disabled");
                position -= images.clientWidth / totalImages;
                images.style.transform = `translateX(${position}px)`;
                curPos++;
            }
            if (curPos === totalImages - 1) {
                nextBtn.setAttribute('disabled', 'true');
            }
        }

        function init() {
            prevBtn.setAttribute('disabled', 'true'); // NEXT 버튼 비활성화
            prevBtn.addEventListener("click", prev);
            nextBtn.addEventListener("click", next);
            if (totalImages <= 1) { // 이미지가 한 장 이하인 경우 NEXT 버튼 비활성화
                nextBtn.setAttribute('disabled', 'true');
            }
        }

        init();
    }

    initGallery(".posi-gallery", ".posi-prev", ".posi-next", ".posi-images");
    initGallery(".pori-gallery", ".pori-prev", ".pori-next", ".pori-images");

    // Back button functionality
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        window.history.back();
    });

    // 이미지 클릭 이벤트 처리
    document.querySelectorAll(".posi-images img, .pori-images img").forEach(img => {
        img.addEventListener("click", function (event) {
            const rect = img.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const imageUrl = img.src;

            fetch('/image-click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    x: x,
                    y: y,
                    image_url: imageUrl
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
        });
    });
});
