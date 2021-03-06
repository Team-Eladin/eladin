import { Router } from 'express';
import is from '@sindresorhus/is';
import { categoryService } from '../services';

const categoryRouter = Router();

// 카테고리 추가
categoryRouter.post('/register', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req의 body 에서 데이터 가져옴
        const {categoryName}  = req.body;

        // 위 데이터를 카테고리 db에 추가
        const newCategory = await categoryService.addCategory(categoryName);

        // 추가된 카테고리의 db 데이터를 프론트에 다시 보내줌
        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
});

// 전체 카테고리 조회
categoryRouter.get('/list', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
})

// 카테고리 이름으로 조회
categoryRouter.get('/:categoryName', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { categoryName } = req.params;

        // 카테고리명을 기준으로 DB 조회
        const category = await categoryService.getCategoryByName(categoryName);

        res.send(200).json(category);
    } catch (error) {
        next(error)
    }
})

// 카테고리 수정
categoryRouter.post('/setcategory/:categoryId', async (req, res, next) => {
    try {
        // req의 params과 body에서 데이터 가져옴
        const { categoryId } = req.params;
        const { categoryName } = req.body;

        // 위 데이터로 카테고리 정보 수정
        const category = await categoryService.setCategory(categoryId, {
            categoryName
        });

        res.send(200).json(category);
    } catch (error) {
        next(error);
    }
})

// 카테코리 삭제
categoryRouter.delete('/deletecategory/:categoryId', async (req, res, next) => {
    try {
        // req의 params에서 데이터 가져옴
        const { categoryId } = req.params;

        // 카테고리 정보 삭제
        const category = await categoryService.deleteCategory(categoryId);

        res.send(200).json(category);
    } catch (error) {
        next(error);
    }
})

export { categoryRouter };