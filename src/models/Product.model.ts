import {Table, Model, Column, DataType, Default} from 'sequelize-typescript'

@Table ({
    tableName: 'products'
})

class Products extends Model {
    @Column({
        type: DataType.STRING(100) //CARACTERES
    })
    declare name: string
    
    @Column({
        type: DataType.FLOAT(6,2) //6 DIGITOS EN TOTAL, 2 DECIMAL
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN 
    })
    declare availability: boolean
    
}

export default Products