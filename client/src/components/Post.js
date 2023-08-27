import React, { useEffect, useState } from "react";

function Post({ post }) {
    return (
        <div>
            <h1>{post.id}</h1>
        </div>
    )
}

export default Post;