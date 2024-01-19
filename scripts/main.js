$(document).ready(function () {

    function scrollToProducts () {
        $('.products-title')[0].scrollIntoView({behavior: "smooth"});
    }

    function makeOrder() {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    }

    $('#macaroons').on('click', scrollToProducts);

    $('#about-us').on('click', () => {
        $('.advantages-title')[0].scrollIntoView({behavior: "smooth"});
    })

    $('#make-order').on('click', makeOrder);

    $('.main-btn').on('click', scrollToProducts);

    $('.product-button').click((e) => {
        $('#order').val($(e.target).parents('.product').find('.product-text').text());
        makeOrder();
    });


    let menu = $('#menu');

    function menuOpen() {
        menu.addClass('open');
    }

    function menuClose() {
        menu.removeClass('open');
    }

    $('#burger').on('click', menuOpen);

    $('.close').on('click', menuClose);

    $('.menu-item').on('click', menuClose);


    let loader = $('.loader');

    function loaderOpen() {
        loader.css('display', 'flex');
    }

    function loaderClose() {
        loader.hide();
    }

    function hideForm() {
        $('.order-text').remove();
        $('.order-image').remove();
        $('.order-success').show();
    }

    let order = $('#order');
    let name = $('#name');
    let phone = $('#phone');
    phone.inputmask({"mask": "(999) 999-9999"});
    function formValidation() {

        let hasError = false;

        $('.error-input').hide();

        if (!order.val()) {
            order.css('border-color', 'red');
            order.next().show();
            hasError = true;
        } else if (order.val()) {
            order.css('border-color', '#821328');
        }

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        } else if (name.val()) {
            name.css('border-color', '#821328');
        }

        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', '#821328');
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
            clearForm();
        }

        function clearForm() {
            name.val("");
            phone.val("");
            order.val()("");
        }
    }

    $('#submit').on('click', formValidation);

});