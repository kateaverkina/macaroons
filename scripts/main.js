let menu = $('#menu');

$('#burger').on('click', function () {
    menu.addClass('open');
});

$('.close').on('click', () => {
    menu.removeClass('open');
});

$('.menu-item').on('click', () => {
    menu.removeClass('open');
});


let loader = $('.loader');
function loaderOpen() {
    loader.css('display', 'flex');
}
function loaderClose() {
    loader.hide();
}

function hideForm () {
    $('.order-text').remove();
    $('.order-image').remove();
    $('.order-success').show();
}

$('#submit').click(function () {
    let order = $('#order');
    let name = $('#name');
    let phone = $('#phone');
    let hasError = false;

    $('.error-input').hide();

    if (!order.val()) {
        order.css('border-color', 'red');
        order.next().show();
        hasError = true;
    }

    if (!name.val()) {
        name.css('border-color', 'red');
        name.next().show();
        hasError = true;
    }
    if (!phone.val()) {
        phone.css('border-color', 'red');
        phone.next().show();
        hasError = true;
    }

    if (!hasError) {
        loaderOpen();
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {order: order.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                setTimeout(() => {
                    loaderClose();
                    console.log(msg);
                    if (msg.success) {
                        hideForm();
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                }, 1000);
            });
    }
})