"""add genre, image, description to book model

Revision ID: 8e909881d58d
Revises: 66f802283fa5
Create Date: 2023-08-03 13:25:48.917020

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8e909881d58d'
down_revision = '66f802283fa5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.add_column(sa.Column('genre', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('book_image', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.drop_column('description')
        batch_op.drop_column('book_image')
        batch_op.drop_column('genre')

    # ### end Alembic commands ###
