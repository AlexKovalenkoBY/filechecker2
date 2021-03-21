async function finishMyTask() {
    try {
        const user = await queryDatabase({ username: 'Arfat' });
        const image_url = user.profile_img_url;
        const image = await getImageByURL('someServer.com/q=${image_url}');
        const transformedlmage = await transformImage(image);
        await sendEmail(user.email);
        await logTaskInFile(' ... ');
    } catch (err) {
        // Обработка всех ошибок
    }
}